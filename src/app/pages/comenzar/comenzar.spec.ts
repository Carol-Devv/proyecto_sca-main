import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Comenzar } from './comenzar';

describe('Comenzar', () => {
  let component: Comenzar;
  let fixture: ComponentFixture<Comenzar>;
  let httpMock: HttpTestingController;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [Comenzar, HttpClientTestingModule, ReactiveFormsModule],
      providers: [
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Comenzar);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify();
  });

  // ===== PRUEBAS GENERALES =====
  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loginForm with empty values', () => {
    expect(component.loginForm.get('userName')?.value).toBe('');
    expect(component.loginForm.get('password')?.value).toBe('');
  });

  it('should initialize registerForm with empty values', () => {
    expect(component.registerForm.get('userName')?.value).toBe('');
    expect(component.registerForm.get('password')?.value).toBe('');
    expect(component.registerForm.get('name')?.value).toBe('');
  });

  // ===== PRUEBAS LOGIN =====
  describe('Login', () => {
    it('should not call API if loginForm is invalid', () => {
      component.loginForm.get('userName')?.setValue('');
      component.loginForm.get('password')?.setValue('');
      
      component.login();
      
      const req = httpMock.match('http://127.0.0.1:3000/api/user/login');
      expect(req.length).toBe(0);
    });

    it('should call login API with correct credentials', () => {
      component.loginForm.patchValue({
        userName: 'testuser',
        password: 'password123'
      });

      component.login();

      const req = httpMock.expectOne('http://127.0.0.1:3000/api/user/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        userName: 'testuser',
        password: 'password123'
      });
    });

    it('should save user to sessionStorage on successful login', () => {
      spyOn(sessionStorage, 'setItem');
      spyOn(window, 'alert');

      component.loginForm.patchValue({
        userName: 'testuser',
        password: 'password123'
      });

      component.login();

      const req = httpMock.expectOne('http://127.0.0.1:3000/api/user/login');
      req.flush({
        success: true,
        message: 'Login correcto',
        user: { userName: 'testuser', name: 'Test User' }
      });

      expect(sessionStorage.setItem).toHaveBeenCalledWith(
        'user',
        JSON.stringify({ userName: 'testuser', name: 'Test User' })
      );
    });

    it('should navigate to /perfil on successful login', () => {
      spyOn(window, 'alert');

      component.loginForm.patchValue({
        userName: 'testuser',
        password: 'password123'
      });

      component.login();

      const req = httpMock.expectOne('http://127.0.0.1:3000/api/user/login');
      req.flush({
        success: true,
        message: 'Login correcto',
        user: { userName: 'testuser', name: 'Test User' }
      });

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/perfil']);
    });

    it('should show error alert on failed login', () => {
      spyOn(window, 'alert');

      component.loginForm.patchValue({
        userName: 'testuser',
        password: 'wrongpassword'
      });

      component.login();

      const req = httpMock.expectOne('http://127.0.0.1:3000/api/user/login');
      req.flush({
        success: false,
        message: 'Credenciales incorrectas'
      });

      expect(window.alert).toHaveBeenCalledWith('Credenciales incorrectas');
    });

    it('should handle login HTTP error', () => {
      spyOn(window, 'alert');
      spyOn(console, 'error');

      component.loginForm.patchValue({
        userName: 'testuser',
        password: 'password123'
      });

      component.login();

      const req = httpMock.expectOne('http://127.0.0.1:3000/api/user/login');
      req.error(new ErrorEvent('Network error'));

      expect(window.alert).toHaveBeenCalledWith('Login fallido. Credenciales incorrectas.');
      expect(console.error).toHaveBeenCalled();
    });
  });

  // ===== PRUEBAS REGISTER =====
  describe('Register', () => {
    it('should not call API if registerForm is invalid', () => {
      component.registerForm.get('userName')?.setValue('');
      
      component.register();
      
      const req = httpMock.match('http://127.0.0.1:3000/api/user/register');
      expect(req.length).toBe(0);
    });

    it('should call register API with all required fields', () => {
      const userData = {
        userName: 'newuser',
        password: 'password123',
        name: 'New User',
        age: '25',
        blodGroup: 'O+',
        kidneys: 'Yes',
        religion: 'Catholic',
        healthStatus: 'Good'
      };

      component.registerForm.patchValue(userData);
      component.register();

      const req = httpMock.expectOne('http://127.0.0.1:3000/api/user/register');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(userData);
    });

    it('should save user to sessionStorage on successful register', () => {
      spyOn(sessionStorage, 'setItem');
      spyOn(window, 'alert');

      component.registerForm.patchValue({
        userName: 'newuser',
        password: 'password123',
        name: 'New User',
        age: '25',
        blodGroup: 'O+',
        kidneys: 'Yes',
        religion: 'Catholic',
        healthStatus: 'Good'
      });

      component.register();

      const req = httpMock.expectOne('http://127.0.0.1:3000/api/user/register');
      req.flush({
        success: true,
        message: 'Registro exitoso',
        user: {
          userName: 'newuser',
          name: 'New User',
          age: '25',
          blodGroup: 'O+',
          kidneys: 'Yes',
          religion: 'Catholic',
          healthStatus: 'Good'
        }
      });

      expect(sessionStorage.setItem).toHaveBeenCalled();
    });

    it('should reset form on successful register', () => {
      spyOn(window, 'alert');

      component.registerForm.patchValue({
        userName: 'newuser',
        password: 'password123',
        name: 'New User',
        age: '25',
        blodGroup: 'O+',
        kidneys: 'Yes',
        religion: 'Catholic',
        healthStatus: 'Good'
      });

      component.register();

      const req = httpMock.expectOne('http://127.0.0.1:3000/api/user/register');
      req.flush({
        success: true,
        message: 'Registro exitoso',
        user: { userName: 'newuser' }
      });

      expect(component.registerForm.get('userName')?.value).toBe(null);
    });

    it('should navigate to /perfil on successful register', () => {
      spyOn(window, 'alert');

      component.registerForm.patchValue({
        userName: 'newuser',
        password: 'password123',
        name: 'New User',
        age: '25',
        blodGroup: 'O+',
        kidneys: 'Yes',
        religion: 'Catholic',
        healthStatus: 'Good'
      });

      component.register();

      const req = httpMock.expectOne('http://127.0.0.1:3000/api/user/register');
      req.flush({
        success: true,
        message: 'Registro exitoso',
        user: { userName: 'newuser' }
      });

      expect(mockRouter.navigate).toHaveBeenCalledWith(['/perfil']);
    });
  });
});
