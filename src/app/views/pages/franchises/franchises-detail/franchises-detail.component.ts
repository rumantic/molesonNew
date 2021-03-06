import {Component, OnInit} from '@angular/core';
import {FranchisesService} from '../../../../core/franchises';
import {FranchisesModel} from '../../../../core/franchises';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {filter} from 'rxjs/operators';
import {OperationsModel} from '../../../../core/operations/_models/operations.model';
import {OperationsService} from '../../../../core/operations';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import 'hammerjs';

@Component({
  selector: 'app-franchises-detail',
  templateUrl: './franchises-detail.component.html',
  styleUrls: ['./franchises-detail.component.scss']
})
export class FranchisesDetailComponent implements OnInit {

  currentFranchise: FranchisesModel;
  private subscription: Subscription;
  operationList: OperationsModel[] = [];
  transactionsCount: number;
  transactionsSum: number;

  galleryOptions: NgxGalleryOptions[];
    galleryImages: NgxGalleryImage[];

  id: string;
  loading = true;

  constructor(
    public franchisesService: FranchisesService,
    public operationsService: OperationsService,
    private activateRoute: ActivatedRoute) {
      this.transactionsCount = 0;
      this.transactionsSum = 0;
  }

  ngOnInit() {
    this.subscription = this.activateRoute.params.subscribe(params => this.id = params.id);
    const result = this.franchisesService.getFranchisesById(this.id, 'all');
    result.subscribe(
      res => {
        this.currentFranchise = new FranchisesModel(res);
        this.galleryImages = [];
        if ( this.currentFranchise.picture !== '' ) {
          this.galleryImages.push({
            small: this.currentFranchise.picture.trim(),
            medium: this.currentFranchise.picture.trim(),
            big: this.currentFranchise.picture.trim()
          });
        }
        console.log(this.currentFranchise.imgs);
        let allowThumbnails = false;
        if ( this.currentFranchise.imgs.length > 0 ) {
          allowThumbnails = true;
          this.currentFranchise.imgs.forEach(
            element => {
              this.galleryImages.push({
                small: element.uri.trim(),
                medium: element.uri.trim(),
                big: element.uri.trim()
              });
            }
          );
        }


        this.galleryOptions = [
            {
                width: '100%',
                height: '400px',
                thumbnailsColumns: 4,
                previewCloseOnClick: true,
                previewCloseOnEsc: true,
                imageArrows: allowThumbnails,
                imageSwipe: true,
                thumbnails: allowThumbnails,
                preview: allowThumbnails,
                imageAnimation: NgxGalleryAnimation.Slide
            },
            // max-width 800
            {
                breakpoint: 800,
                width: '100%',
                height: '600px',
                imagePercent: 80,
                thumbnailsPercent: 20,
                thumbnailsMargin: 20,
                thumbnailMargin: 20
            },
            // max-width 400
            {
                breakpoint: 400,
                preview: false
            }
        ];




        /*
        for(var i in this.currentFranchise.imgs){
            this.galleryImages.push({
                small: this.currentFranchise.imgList[i],
                medium: this.currentFranchise.imgList[i],
                big: this.currentFranchise.imgList[i]
            });
        }

         */

        // console.log(this.galleryImages);

        // console.log(res);
      }, err => {
        console.warn(err);
      }, () => {
        this.loading = false;
      }
    );
    this.count_my_income();
  }

  private count_my_income() {
    this.operationsService.transactionGet().subscribe(res => {
      for (const item of res.data) {
        const operation = new OperationsModel(item);
        if ( operation.typeActionRaw === 'pay franchises' && item.data._id === this.id) {
          // console.log(item);

          this.transactionsCount += item.data.stocks;
          this.transactionsSum += item.quantity * .01;

          this.operationList.push(operation);
        }
      }
      // console.log(this.operationList);
    }, err => {
      console.warn(err);
    }, () => {
    });
  }
}
