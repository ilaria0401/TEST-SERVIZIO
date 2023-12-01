import { Component,ElementRef,OnInit, ViewChild, } from '@angular/core';
import { FormGroup,FormControl,FormBuilder,FormsModule } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from './app.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers:[AppService,HttpClient]
})
export class AppComponent implements OnInit{
  title = 'TEST-SERVIZIO';
  @ViewChild('modalInserimento')modalInserimento!:ElementRef;
  FormSearch:FormGroup;


  arreyListaServer=[
    {
      fattureIpaId:0,
      codice:'',
      denominazione:''
    }
  ];

  serverFilter=[...this.arreyListaServer]

  constructor(private fb: FormBuilder, private modalService: NgbModal, private restService: AppService) {
    this.FormSearch=this.fb.group({
     fattureIpaId : new FormControl (''),
     codice : new FormControl (''),
     denominazione : new FormControl (''),

    })

    console.log("arreyListaServer >>", this.arreyListaServer);

    this.restService.listIpa().then(
      res => {
        let arrayFiltrato = [...res.ipaBindList].filter(ipa => ipa.fattureIpaId>0);

        this.arreyListaServer = arrayFiltrato
        console.log("arreyListaServer 2>>", this.arreyListaServer);


      }
    )

  }

  ngOnInit(): void {}

  apriModalInserimento(){
    this.modalService.open(this.modalInserimento, {size: 'lg' })
  }

}




