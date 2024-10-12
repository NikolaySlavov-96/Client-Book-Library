export enum _EReceiveEvents {
    NEW_BOOK_ADDED = 'new-book-added',
    USER_JOINED = 'user_joined',
    SUPPORT_CHAT_USER_JOIN_ACKNOWLEDGMENT = 'support_chat_user_join_acknowledgment',
    SEND_SUPPORT_MESSAGE = 'send_support_message',
    NOTIFY_ADMINS_OF_NEW_USER = 'notify_admins_of_new_user',
    SUPPORT_ACCEPT_USER_ACKNOWLEDGMENT = 'support_accept_user_acknowledgment',
    RECEIVE_SUPPORT_MESSAGE = 'receive_support_message',
};

export enum _ESendEvents {
    USER_JOINED = 'user_joined',
    SUPPORT_CHAT_USER_JOIN = 'support_chat_join',
    SUPPORT_CHAT_USER_LEAVE = 'support_chat_leave',
    SUPPORT_ACCEPT_USER = 'support_accept_user',
    SEND_SUPPORT_MESSAGE = 'send_support_message',
};