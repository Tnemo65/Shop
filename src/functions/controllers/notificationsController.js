import { doc, updateDoc, collection, setDoc, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import Notification from "../models/notifications";

export const createNotification = async (uid, notificationData) => {
    try {
      const notificationID = doc(collection(db, "notifications")).id;
      
      console.log("===== DEBUG createNotification =====");
      console.log("uid:", uid);
      console.log("notificationData:", JSON.stringify(notificationData));
      console.log("Checking RelatedID:", notificationData.RelatedID);
      console.log("All keys in notificationData:", Object.keys(notificationData));
      
      const notification = new Notification({
        NotificationID: notificationID,
        uid: uid,
        Message: notificationData.Message,
        IsRead: false,
        CreatedAt: new Date(),
        RelatedID: notificationData.RelatedID || ""
      });
      
      console.log("Created notification object:", JSON.stringify(notification));
      console.log("RelatedID in notification:", notification.RelatedID);
  
      const docRef = doc(db, "notifications", notificationID);
      await setDoc(docRef, notification.toJSON());
      
      return notification;
    } catch (error) {
      console.error("Error creating notification:", error);
      throw error;
    }
  };

// Lấy thông báo dựa trên uid (không phải UserID)
export const getUserNotifications = async (uid) => {
  try {
    console.log("Fetching notifications for user with uid:", uid);
    
    const q = query(
      collection(db, "notifications"),
      where("uid", "==", uid),    // Lọc theo uid
      orderBy("CreatedAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const notifications = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    console.log("Fetched notifications:", notifications);
    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

// Đánh dấu thông báo đã đọc
export const markNotificationAsRead = async (notificationID) => {
  try {
    const docRef = doc(db, "notifications", notificationID);
    await updateDoc(docRef, { IsRead: true });
    
    return { success: true };
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};