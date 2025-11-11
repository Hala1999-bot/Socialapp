// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { inject, Injectable } from '@angular/core';
// import { environment } from '../../../../../environments/environment';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root',
// })
// export class PostService {
//   private readonly httpClient = inject(HttpClient);
//   createPost(data: object): Observable<any> {
//     return this.httpClient.post(environment.baseUrl + `posts`, data);
//   }
//   getAllPosts(): Observable<any> {
//     const token = localStorage.getItem('token');

//     // فقط علشان نشوف هل التوكن فعلاً موجودة
//     console.log('🟦 Token from localStorage:', token);

//     const headers = new HttpHeaders({
//       Authorization: `Bearer ${token}`,
//     });
//     console.log('🟦 Token:', localStorage.getItem('token'));

//     return this.httpClient.get(`${environment.baseUrl}posts?limit=50`, { headers });
//   }
//   // return this.httpClient.get(environment.baseUrl + `posts?limit=50`);

//   getUserPosts(): Observable<any> {
//     return this.httpClient.get(
//       environment.baseUrl + `users/664bcf3e33da217c4af21f00/posts?limit=2`
//     );
//   }
//   getSinglePosts(idPost: string | null): Observable<any> {
//     return this.httpClient.get(environment.baseUrl + `posts/${idPost}`);
//   }
//   putUpdatePosts(data: object): Observable<any> {
//     return this.httpClient.put(environment.baseUrl + `posts/66875b3b006c4ff191a61a89`, data);
//   }
//   deletePosts(): Observable<any> {
//     return this.httpClient.delete(environment.baseUrl + `posts/66875b3b006c4ff191a61a89`);
//   }
// }

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly httpClient = inject(HttpClient);

  // ✅ Signal لتخزين كل البوستات
  allPosts = signal<any[]>([]);

  // ✅ تحميل كل البوستات
  // getAllPosts(): void {
  //   const token = localStorage.getItem('token');

  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`,
  //   });

  //   this.httpClient.get<any[]>(`${environment.baseUrl}posts?limit=50`, { headers }).subscribe({
  //     next: (res) => {
  //       console.log('📦 Posts fetched:', res);
  //       this.allPosts.set(res); // نحفظ البيانات في الـ signal
  //     },
  //     error: (err) => {
  //       console.error('❌ Error fetching posts:', err);
  //     },
  //   });
  // }

  getAllPosts(): Observable<any> {
    const token = localStorage.getItem('token');

    // فقط علشان نشوف هل التوكن فعلاً موجودة
    console.log('🟦 Token from localStorage:', token);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    console.log('🟦 Token:', localStorage.getItem('token'));

    this.httpClient.get<any[]>(`${environment.baseUrl}posts?limit=50`, { headers }).subscribe({
      next: (res) => {
        console.log('📦 Posts fetched:', res);
        this.allPosts.set(res); // نحفظ البيانات في الـ signal
      },
      error: (err) => {
        console.error('❌ Error fetching posts:', err);
      },
    });

    return this.httpClient.get(`${environment.baseUrl}posts?limit=50`, { headers });
  }
  // ✅ إنشاء بوست جديد
  createPost(data: FormData): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.post(environment.baseUrl + `posts`, data, { headers });
  }

  getUserPosts(): Observable<any> {
    return this.httpClient.get(
      environment.baseUrl + `users/664bcf3e33da217c4af21f00/posts?limit=2`
    );
  }

  getSinglePosts(idPost: string | null): Observable<any> {
    return this.httpClient.get(environment.baseUrl + `posts/${idPost}`);
  }

  putUpdatePosts(data: object): Observable<any> {
    return this.httpClient.put(environment.baseUrl + `posts/66875b3b006c4ff191a61a89`, data);
  }

  deletePosts(): Observable<any> {
    return this.httpClient.delete(environment.baseUrl + `posts/66875b3b006c4ff191a61a89`);
  }
}
