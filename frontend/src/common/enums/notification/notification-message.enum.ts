enum NotificationMessage {
  EAM_PERMISSION_LACK = 'You do not have the necessary rights to perform these actions.',
  EAM_WORKER_CREATE = 'Worker has been successfully created',
  EAM_WORKER_DELETE = 'Worker has been successfully deleted',
  EAM_GROUP_CREATE = 'Group has been successfully created',
  EAM_GROUP_UPDATE = 'Group has been successfully updated',
  EAM_GROUP_DELETE = 'Group has been successfully deleted',
  BS_SPACE_CREATE = 'Space has been successfully created',
  BS_SPACE_DELETE = 'Space has been successfully deleted',
  BS_OBJECT_DELETE = 'Object has been successfully deleted',
  BS_OBJECT_UPLOAD = 'Object has been successfully uploaded',
  BS_OBJECT_DOWNLOAD = 'Object has been successfully downloaded',
  SC_INSTANCE_CREATE = 'Instance has been successfully created',
  SC_INSTANCE_DELETE = 'Instance has been successfully deleted',
  SC_INSTANCE_UPDATE = 'Instance has been successfully updated',
  SC_SSH_KEY_COPY = 'Ssh key has been successfully copied',
  SLC_FUNCTION_CREATE = 'Function has been successfully created',
  SLC_FUNCTION_DELETE = 'Function has been successfully deleted',
  EAM_UPDATE_TENANT_NAME = 'Tenant name has been successfully changed',
}

export { NotificationMessage };
