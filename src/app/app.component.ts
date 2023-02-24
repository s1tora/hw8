import { Component, OnInit } from '@angular/core';

interface Post {
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

const API_URL = 'https://jsonplaceholder.typicode.com';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: Post[] = [];
  comments: Comment[] = [];
  modalVisible = false;

  async ngOnInit() {
    this.posts = await this.fetchPosts();
  }

  async fetchPosts(): Promise<Post[]> {
    const response = await fetch(`${API_URL}/posts`);
    const data = await response.json();
    return data.slice(0, 10);
  }

  async fetchComments(postId: number): Promise<Comment[]> {
    const response = await fetch(`${API_URL}/comments?postId=${postId}`);
    const data = await response.json();
    return data.slice(0, 5);
  }

  async onCommentsButtonClick(postId: number) {
    this.comments = await this.fetchComments(postId);
    this.modalVisible = true;
  }

  onCloseModalClick() {
    this.modalVisible = false;
  }
}
