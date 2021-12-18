import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { GenericService } from '../generic.service';


describe("GenericService", () => {
    let service: GenericService<any>;
    const httpClient = jasmine.createSpyObj('HttpClient', ['get', 'post', 'put', 'delete']);
    
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: HttpClient, useValue: httpClient },
                HttpHandler,
                HttpClientTestingModule
            ]
        });
        service = new GenericService(httpClient as any, 'https//');
    })
    
    it('Should be created', () => {
        //service = TestBed.inject(httpClient)
        expect(service).toBeTruthy();
    });

    it('Should return data whit action GET', () => {
        const mockRequest = [{
            content: []
        }];
        httpClient.get.and.returnValue(of(mockRequest));
        service.listar({}).subscribe(resp => {
            expect(resp).toEqual(mockRequest);
        })
    });

    it('Should return data whit action GET for Id', (done: DoneFn) => {
        const mockRequest = {
            content: {}
        };
        httpClient.get.and.returnValue(of(mockRequest));
        service.listarPorId(1).subscribe(resp => {
            expect(resp).toEqual(mockRequest);
            done();
        })
    });

    it('Should return data whit action POST', (done: DoneFn) => {
        const mockRequest = {
            content: {}
        };
        httpClient.post.and.returnValue(of(mockRequest));
        service.crear({}).subscribe(resp => {
            expect(resp).toEqual(mockRequest);
            done();
        })
    });

    it('Should update data whit action PUT', (done: DoneFn) => {
        const mockRequest = {
            content: {}
        };
        httpClient.put.and.returnValue(of(mockRequest));
        service.modificar({}).subscribe(resp => {
            expect(resp).toEqual(mockRequest);
            done();
        })
    });

    it('Should return data whit action DELETE for Id', () => {
        httpClient.delete.and.returnValue(of({status: 204}));
        service.eliminar(1).subscribe(resp => {
            expect(resp).toEqual({status: 204});
        })
    });
})