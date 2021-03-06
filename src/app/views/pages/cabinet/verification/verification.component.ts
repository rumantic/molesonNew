import { Component, OnInit } from '@angular/core';
import {TokenService} from '../../../../core/token/token.service';
import {Router} from '@angular/router';
import {ApiConfig} from '../../../../core/config/api.config';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  constructor(public tokenService: TokenService,
              protected router: Router,
              protected apiConfig: ApiConfig) { }

  ngOnInit() {
    this.jumpToActualStep();
  }

  getStep() {
    return this.tokenService.getVerificationStep();
  }

  getStepClass(step) {
    if ( step > this.getStep() ) {
      return 'step';
    }
    return 'step complete-step';
  }

  private jumpToActualStep() {
    const jumpStep = '';
    let nextStep = 1;
    if ( this.getStep() > 5 ) {
      nextStep = 5;
    } else {
      nextStep = this.getStep();
    }

    const result = jumpStep.concat(this.apiConfig.cabinetVerifiction, 'step', nextStep.toString());
    this.router.navigate([result]);
  }
  getNextStep( step: number ) {
    if ( this.getStep() < step ) {
      return this.getStep();
    }
    return step;
  }
  getActiveStepClass(step: number) {
    if ( step === this.getNextStep(step) ) {
      return 'active-step';
    }
    return '';
  }
  protectStep(step: number) {
    if ( this.tokenService.getVerificationStep() < step ) {
      const jumpStep = '';
      this.router.navigate(
        [jumpStep.concat(this.apiConfig.cabinetVerifiction, 'step', this.tokenService.getVerificationStep().toString())]
      );
    }
  }
}
