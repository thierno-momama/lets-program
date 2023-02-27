import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = "http://localhost:3000/posts";

  constructor(private http: HttpClient) { }

  getPosts(data: any){
    return this.http.post<any>(this.url, data).pipe(map((res: any) => {
      return res;
    }));
  }

  getEmployee(){
    return this.http.get<any[]>(this.url).pipe((res: any) => {
      return res;
    });
  }

  updateEmployee(data: any, id: number){
    return this.http.put<any>(this.url+"/"+id, data).pipe((res: any) => {
      return res;
    });
  }

  deleteEmployee(id: number){
    return this.http.delete<any>(this.url+"/"+id).pipe((res: any) => {
      return res;
    });
  }
  
}
