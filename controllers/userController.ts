import { Request, Response, NextFunction } from 'express'; 
const {User} = require("../models")
const {decode, encode} = require("../helpers/bcrypt")
const {sign} = require("../helpers/jwt")
import amqp from 'amqplib';

export class UserController {
  static async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
      };
      userData.password = encode(userData.password);
      const data = await User.create(userData);
      const connection = await amqp.connect('amqp://localhost');
      const channel = await connection.createChannel();
      const queue = 'email-queue'
      await channel.assertQueue(queue, { durable: true });
      const emailData = JSON.stringify({ 
        to: userData.email, 
        subject: 'test', 
        text: 'test'
      });
      channel.sendToQueue(queue, Buffer.from(emailData), { persistent: true });

      console.log('Message sent to RabbitMQ:', emailData);

      res.status(201).json({
        name: data.name,
        msg: 'Account Created',
      });
    } catch (err: any) {
      if (err.name === 'ServerError') {
        next({ name: 'ServerError', message: err.message });
      } else {
        next({ name: 'SequelizeValidationError', err });
      }
    }
  }
  static async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = {
        username: req.body.username,
        password: req.body.password,
      };

      const data = await User.findOne({
        where: {
          username: userData.username,
        },
      });

      if (data) {
        if (decode(userData.password, data.password)) {
          const payload = {
            username: data.username,
          };

          const access_token = sign(payload);
          res.status(200).json({ access_token });
        } else {
          next({ name: 'BadRequest', message: 'Invalid username/password' });
        }
      } else {
        next({ name: 'BadRequest', message: 'Invalid username/password' });
      }
    } catch (err:any) {
      next({ name: 'ServerError', message: err.message });
    }
  }
  static async changePassword(req: Request, res: Response, next: NextFunction) {
    try{
      const userData = {
        username: req.body.username,
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword
      }

      const data = await User.findOne({
        where: {
          username: userData.username
        }
      }) 

      if(data) {
        if(decode(userData.oldPassword, data.password)) {
          const newData = {
            password: encode(userData.newPassword)
          }
          const [rowsUpdated, [updateData]] = await User.update(newData, {
            where: { username: userData.username },
            returning: true, // This ensures that the updated record is returned
          });
          if (rowsUpdated === 0) {
            return res.status(404).json({ error: 'User not found' });
          }
      
          res.status(200).json(updateData);
        }
      }

    } catch(err:any) {

    }
  }
  static async deleteAccount(req: Request, res: Response, next:NextFunction) {
    try {
      const username = req.body.username
      const deletedUser = await User.destroy({
        where: {
          username: username
        }
      }) 
      console.log(deletedUser)
      if(deletedUser === 0) {
        res.status(404).json({
          message: 'data not found'
        })
      }
      res.status(200).json({
        message: 'data deleted'
      })
    } catch(err:any) {
        
    }
  }
  static async getAccount (req: Request, res: Response, next: NextFunction) {
    try{
      res.status(200).json({})
    } catch(err) {
      res.status(200).json({})

    }
  }
}

