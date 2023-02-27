import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashboard.model';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit{

  formValue!: FormGroup;
  employeeModelObject: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService){}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      salary: ['']
    });
    
    this.getAllData();
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails(){
    this.employeeModelObject.firstName = this.formValue.value.firstName;
    this.employeeModelObject.lastName = this.formValue.value.lastName;
    this.employeeModelObject.email = this.formValue.value.email;
    this.employeeModelObject.mobile = this.formValue.value.mobile;
    this.employeeModelObject.salary = this.formValue.value.salary;

    this.apiService.getPosts(this.employeeModelObject).subscribe(res => {
      alert("Employee adding successfully");
      this.formValue.reset();
      const ref = document.getElementById('cancel');
      ref?.click();
      this.getAllData();

    }, 
    error => console.log("Something went wrong"));
  }

  getAllData(){
    this.apiService.getEmployee().subscribe(res => {
      this.employeeData = res;
    });
  }

  deleteEmployee(row: any){
    this.apiService.deleteEmployee(row.id).subscribe(res => {
      alert("Employee Deleted");
      this.getAllData();
    })
  }

  onEdit(row: any){

    this.showAdd = false;
    this.showUpdate = true;
    
    this.employeeModelObject.id= row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['salary'].setValue(row.salary);
  }

  updateEmployeeDetails(){
    this.employeeModelObject.firstName = this.formValue.value.firstName;
    this.employeeModelObject.lastName = this.formValue.value.lastName;
    this.employeeModelObject.email = this.formValue.value.email;
    this.employeeModelObject.mobile = this.formValue.value.mobile;
    this.employeeModelObject.salary = this.formValue.value.salary;

    this.apiService.updateEmployee(this.employeeModelObject, this.employeeModelObject.id).subscribe(res =>{
      alert("EMployee updated successfully");
      this.formValue.reset();
      const ref = document.getElementById('cancel');
      ref?.click();
      this.getAllData();
    })
  }


}
