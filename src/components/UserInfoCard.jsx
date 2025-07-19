import React from 'react';

const UserInfoCard = ({ user, drawer }) => {
  if (!user) return null;
  return (
    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
      <div>اسم المستخدم: {user.username}</div>
      <div>الدور: {user.role}</div>
      {drawer !== null && (
        <div>الدُرج: {drawer} ج.م</div>
      )}
    </div>
  );
};

export default UserInfoCard; 