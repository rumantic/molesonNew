import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from '../../../../../core/auth/_services/auth.service';
import {User} from '../../../../../core/auth/_models/user.models';
import {TokenService} from '../../../../../core/token/token.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  open = false;
  openMobile = false;
  width = window.innerWidth;
  user: User;
  constructor(private authService: AuthService,
              private router: Router,
              public tokenService: TokenService) { }

  ngOnInit() {
    // console.log(this.authService.getUserByToken());
    document.addEventListener('click', () => {
      this.open = false;
    });
    this.tokenService.getUserByToken().subscribe(
      next => {
        this.user = next;
        // console.log(this.user);
      },
      err => console.log(err),
      () => {
        // console.log('accept');
      });
  }

  openBlock(open: boolean, event: Event) {
    event.stopPropagation();
    this.open = open;
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.open = false;
    this.width = event.target.innerWidth;
  }
  goToRoute(route: string, event: Event) {
    this.open = false;
    this.openBlock(false, event);
    this.router.navigate([route]);
  }
  logout() {
    this.authService.logout();
  }
}
