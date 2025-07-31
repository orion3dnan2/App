import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";

export const useNewMerchant = () => {
  const { user } = useAuth();
  const [isNewMerchant, setIsNewMerchant] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user?.createdAt) {
      const accountAge = Date.now() - new Date(user.createdAt).getTime();
      const daysSinceCreation = accountAge / (1000 * 60 * 60 * 24);

      // التاجر يُعتبر جديد إذا كان عمر الحساب أقل من 7 أيام
      // أو إذا لم يكن له منتجات أو طلبات (يمكن إضافة هذا المنطق لاحقاً)
      setIsNewMerchant(daysSinceCreation < 7);
    } else {
      // إذا لم تكن هناك بيانات مستخدم، نفترض أنه جديد
      setIsNewMerchant(true);
    }
    setIsLoading(false);
  }, [user]);

  return { isNewMerchant, isLoading, user };
};
