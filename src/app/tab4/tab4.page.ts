import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit{
  darkMode = false;
  isCollapsed: boolean = false;
  isUserAuthenticated?: boolean;
  email?: any
  userFirstName?: any
  userLastName?: any
  private dialogConfig: any;
  loggedInUser = JSON.parse(localStorage.getItem("login-user")!)
  constructor(    private router: Router,private modalController: ModalController) { }

  ngOnInit(): void {
    this.logout();
    console.log(this.loggedInUser);
  }

  public logout = () => {

  }

  public redirectToDetails = async () => {
    if (this.modalController) {
      const topModal = await this.modalController.getTop();
      if (topModal) {
        this.modalController.dismiss();
      }
    }
    let url: string = `/tabs/tab4/orders`;
    this.router.navigate([url]);
  }
  public redirectToDetailsNote = async () => {
    let url: string = `/tabs/tab4/notifications`;
    this.router.navigate([url]);
  }
  public redirectToDetailsBooking = async () => {
    let url: string = `/tabs/tab4/bookings`;
    this.router.navigate([url]);
  }

  onLogout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
