export enum _EReceiveEvents {
    ERROR = 'error',
    NEW_PRODUCT_ADDED = 'new-product-added',
    COMPLETE_ISSUE = 'complete-issue',
    USER_CONNECT = 'user_connect',
    SUPPORT_CHAT_USER_JOIN_ACKNOWLEDGMENT = 'support_chat_user_join_acknowledgment',
    SUPPORT_MESSAGE = 'support_message',
    NOTIFY_FOR_CREATE_ROOM = 'notify_for_created_room',
    NOTIFY_ADMINS_OF_NEW_USER = 'notify_admins_of_new_user',
    SUPPORT_ACCEPT_USER_ACKNOWLEDGMENT = 'support_accept_user_acknowledgment',
};

export enum _ESendEvents {
    USER_CONNECT = 'user_connect',
    USER_ACCEPT_JOIN_TO_ROOM = 'user_accept_join_to_room',
    SUPPORT_CHAT_USER_JOIN = 'support_chat_join',
    SUPPORT_CHAT_USER_LEAVE = 'support_chat_leave',
    SUPPORT_ACCEPT_USER = 'support_accept_user',
    SUPPORT_MESSAGE = 'support_message',
};