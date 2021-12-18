import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { OrderService } from './../order.service';

describe('OrderService', () => {
    let service: OrderService;
    const httpClient = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: HttpClient, useValue: httpClient },
                HttpHandler,
                HttpClientTestingModule
            ]
        });
        service = TestBed.inject(OrderService);
    });

    it('Should be created', () => {
        expect(service).toBeTruthy();
    });
})