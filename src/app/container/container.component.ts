import { AfterContentInit, Component, ContentChild, Host, OnInit, ViewChild } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css'],
  /* providers: [RoomsService] */
})
export class ContainerComponent implements OnInit, AfterContentInit {

  @ContentChild(EmployeeComponent) employee !: EmployeeComponent;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterContentInit(): void {
      console.log(this.employee);
      this.employee.empName = 'Rick';
  }

}
