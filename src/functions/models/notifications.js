export default class Notification {
    constructor({
      NotificationID = "",
      uid = "",
      Message = "",
      IsRead = false,
      CreatedAt = new Date(),
      RelatedID = ""    
    }) {
        console.log("===== DEBUG Notification Constructor =====");
        console.log("Input params:", { NotificationID, uid, Message, IsRead, CreatedAt, RelatedID });
      this.NotificationID = NotificationID;
      this.uid = uid;
      this.Message = Message;
      this.IsRead = IsRead;
      this.CreatedAt = CreatedAt;
      this.RelatedID = RelatedID;
    }
  
    toJSON() {
      return {
        NotificationID: this.NotificationID,
        uid: this.uid,
        Message: this.Message,
        IsRead: this.IsRead,
        CreatedAt: this.CreatedAt,
        RelatedID: this.RelatedID
      };
    }
  
    static fromJSON(data) {
      return new Notification({
        ...data,
        CreatedAt: data.CreatedAt instanceof Date ? data.CreatedAt : new Date(data.CreatedAt)
      });
    }
  }