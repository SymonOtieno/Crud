// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { EventEmitter } from 'node:events';

class MyEmitter extends EventEmitter {}

export default class EventsController {
    public async event(){

        const myEmitter = new MyEmitter();
        myEmitter.on('event', ()=> {
         setImmediate(() => {
            console.log('This happens Asynchronously')
         })
        });
        
        myEmitter.emit('event');
}
}
