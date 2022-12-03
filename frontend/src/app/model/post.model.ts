
export class Post {
    _id!: String;
    userId!: String;
    text!: String;
    picture!: String;
    video!: String;
    likes!: Number;
    usersLiked!: String[];
    comments!: [
        {
        commentId: String,
        userId: String,
        text: String,
        timestamp: Date
        }
    ];
    dateSave!: Date;
  }
  