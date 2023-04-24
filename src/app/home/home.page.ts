import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Message } from '../interfaces/interfaces';
import { AIService } from '../services/ai.service';
import { error, log } from 'console';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  search:boolean=false;
  messages: Message[] = [

  ];

  form = new FormGroup({
    message: new FormControl(''),
  });

  constructor(private _AiService: AIService ){

  }

  sendMessage() {
    if (!this.form.invalid) {
      let content = this.form.value.message as string;

      //Messages as a person
      let newMessage: Message = {
        origin: 'me',
        content: content,
      };
      this.messages.push(newMessage);

      let newMessageBot: Message = {
        origin: 'bot',
        content: '',
      };
      this.messages.push(newMessageBot); 
      this.form.reset();
      this.form.disable();

      this.search=true;


      this._AiService.postMessage(content).subscribe(
        (res:any)=>{
          this.search= false;
          this.typeText(res);
          this.form.enable();
        }
      )
    } else {
      
    }
  }

  typeText(text:string){
    let textIndex=0;
    let messagesLastIndex = this.messages.length -1;
    let interval = setInterval(()=>{
      if(textIndex < text.length){
        this.messages[messagesLastIndex].content += text.charAt(textIndex);
        textIndex++;
      }
      else{
        clearInterval(interval);
      }
    },15)
  }
}
