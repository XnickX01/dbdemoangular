import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { query } from '@angular/animations';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpressServiceService {

  public userLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  logIn(username: string, password: string){
    console.log("Logging in");
    return this.http.post('http://localhost:3000/login', {USERNAME: username, password: password});
  }

  getUserByToken(){
    const token = localStorage.getItem('token'); // get the token from local storage
    console.log(token);
    const headers = new HttpHeaders().set('Authorization', `${token}`);

    return this.http.get('http://localhost:3000/user/token', { headers });  }

  signUp(registration: any){
    console.log("Signing up");
    return this.http.post('http://localhost:3000/user', registration);
  }

  getEvents(): Observable<any>{
    return this.http.get('http://localhost:3000/events');
  }

  addEvent(event: any){
    return this.http.post('http://localhost:3000/events', event);
  }

  deleteEvent(id: string){
    return this.http.delete('http://localhost:3000/events/' + id);
  }

  updateEvent(event: any){
    return this.http.put('http://localhost:3000/events/' + event._id, event);
  }

  getEvent(id: string){
    return this.http.get('http://localhost:3000/events/' + id);
  }

  getRSO(){
    return this.http.get('http://localhost:3000/rso');
  }

  getRSOByUniversityIdAndUser(uid: string, userid: string){
    return this.http.get('http://localhost:3000/rsomember/' + uid + '/' + userid);
  }

  addRSO(rso: any){
    return this.http.post('http://localhost:3000/rso', rso);
  }

  deleteRSO(id: string){
    return this.http.delete('http://localhost:3000/rso/' + id);
  }

  updateRSO(rso: any){
    return this.http.put('http://localhost:3000/rso/' + rso._id, rso);
  }

  getRSOById(id: string){
    return this.http.get('http://localhost:3000/rso/' + id);
  }

  getUniversity(){
    return this.http.get('http://localhost:3000/university');
  }

  addUniversity(university: any){
    return this.http.post('http://localhost:3000/university', university);
  }

  deleteUniversity(id: string){
    return this.http.delete('http://localhost:3000/university/' + id);
  }

  updateUniversity(university: any){
    return this.http.put('http://localhost:3000/university/' + university._id, university);
  }

  getUniversityById(id: string){
    return this.http.get('http://localhost:3000/university/' + id);
  }

  joinRSO(postBody: any){
    return this.http.post('http://localhost:3000/rsomember', postBody);
  }

  leaveRSO(id: string, postBody: any){
    return this.http.delete('http://localhost:3000/rsomember/' + id + '/' + postBody.RSOID);
  }

  getRSOByUniversity(id: string){
    return this.http.get('http://localhost:3000/rso/university/' + id);
  }

  updateStudent(student: any, id: string){
    return this.http.put('http://localhost:3000/student/' + id, student);
  }

  getStudentById(id: string){
    return this.http.get('http://localhost:3000/student/' + id);
  }

  addEventWithoutRSO(event: any){
    return this.http.post('http://localhost:3000/eventwithoutrso', event);
  }

  getEventWithoutRSO(){
    return this.http.get('http://localhost:3000/eventwithoutrso');
  }

  deleteEventWithoutRSO(id: string){
    return this.http.delete('http://localhost:3000/eventwithoutrso/' + id);
  }

  updateEventWithoutRSO(event: any){
    return this.http.put('http://localhost:3000/eventwithoutrso/' + event._id, event);
  }

  getEventWithoutRSOById(id: string){
    return this.http.get('http://localhost:3000/eventwithoutrso/' + id);
  }

  rateEvent(event: any, id: string){
    return this.http.post('http://localhost:3000/rateevent/' + id, event);
  }

  addEventReview(event: any, id: string){
    return this.http.post('http://localhost:3000/eventreview/' + id, event);
  }

  getEventReview(id: string){
    return this.http.get('http://localhost:3000/eventreview/' + id);
  }

  updateEventReview(event: any, id: string){
    return this.http.put('http://localhost:3000/eventreview/' + id, event);
  }

  deleteEventReview(id: string){
    return this.http.delete('http://localhost:3000/eventreview/' + id);
  }

  getUsers(){
    return this.http.get('http://localhost:3000/users');
  }

  addLocation(location: any){
    return this.http.post('http://localhost:3000/location', location);
  }

  getLocations(){
    return this.http.get('http://localhost:3000/location');
  }

  getReviewsbyEvent(id: string){
    return this.http.get('http://localhost:3000/event/event-id/' + id);
  }

  addReview(review: any){
    return this.http.post('http://localhost:3000/eventcmt', review);
  }

  getReviewsByUserId(id: string){
    return this.http.get('http://localhost:3000/event/user-id/' + id);
  }

  updateReview(review: any, id: string){
    return this.http.put('http://localhost:3000/eventcmt/' + id, review);
  }

  deleteReview(id: string){
    return this.http.delete('http://localhost:3000/eventcmt/' + id);
  }



}
