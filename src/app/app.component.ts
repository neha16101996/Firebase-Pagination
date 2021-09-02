import { Component } from '@angular/core';
import {StorageService} from "./storage.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'firebasePagination';
  isLoading = false;
  serialNo:any=0;

  public dataSource = []; // array where you store your data in array
  ROWS = 10;
  rowId:any = 0; // rowId on the basic of rowId pagination should be done
  rowId2:any = 0;


  constructor(public userSevice1Child:StorageService){

  }

  nextPage(){
  
    this.isLoading = true;
       
        this.userSevice1Child.setCookie('serialNo',(this.serialNo + this.dataSource.length));
        const myData =this.userSevice1Child.getCookie('serialNo');
        this.serialNo = Number(myData) ;
        console.log(this.serialNo);
       this.rowId =  this.dataSource[this.dataSource.length-1].rowId;
       this.nextItem(this.rowId)
       .subscribe(data => {
        this.isLoading = false;
       
           this.dataSource = data;
           console.log("rowidNextButton" + this.rowId);
       })

  }

  prevPage() {

    this.isLoading = true;
        this.rowId = this.dataSource[0].rowId;
        this.rowId2 = this.dataSource[this.dataSource.length - 1].rowId;      
        if(this.rowId < this.rowId2){
            this.rowId = this.rowId;
        }else{
            this.rowId = this.rowId2;
        }
        console.log("rowid" + this.rowId);
       
        this.serialNo = Number(this.userSevice1Child.getCookie('serialNo')) - 10;
        this.userSevice1Child.setCookie('serialNo',this.serialNo);
        this.prevItem(this.rowId)
        .subscribe(data =>{
            this.isLoading = false;
           
            this.dataSource.data = data.reverse();
            console.log(this.dataSource.data );
        });
  }


  nextItem(id:any):Observable<any[]>{
    return this.getCollection(this.getCollectionPath(), ref => ref
    .where('rowId', '>', id)
    .limit(this.ROWS));
    }

    prevItem(id:any):Observable<any[]> {
        console.log("hijihb   "+id);
        return this.getCollection(this.getCollectionPath(), ref => ref
       .orderBy('rowId', 'desc')
        .where('rowId', '<', id)
        .limit(this.ROWS));
  
    }
}
