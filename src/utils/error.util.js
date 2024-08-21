const loggin = require("./loggin.util");

class ServerError extends Error {
  constructor(message, object = {}) {
    super(message);
    this.name = "ServerError";
    this.object = object;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ServerError);
    }
    loggin.error("SERVER", this.message, this.stack, this.object);
  }
}

class DatabaseError extends Error {
  constructor(message, object = {}) {
    super(message);
    this.name = "DatabaseError";
    this.object = object;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DatabaseError);
    }
    loggin.error("MYSQL", this.message, this.stack, this.object);
  }
}

class UserNotFoundError extends Error {
  constructor(message, object = {}) {
    super(message);
    this.name = "UserNotFoundError";
    this.object = object;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UserNotFoundError);
    }
    loggin.error("CLIENT", this.message, this.stack, this.object);
  }
}

class ItemNotFoundError extends Error {
  constructor(message, object = {}) {
    super(message);
    this.name = "ItemNotFoundError";
    this.object = object;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ItemNotFoundError);
    }
    loggin.error("CLIENT", this.message, this.stack, this.object);
  }
}

class AlreadyInUseError extends Error {
  constructor(message, object = {}) {
    super(message);
    this.name = "AlreadyInUseError";
    this.object = object;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, AlreadyInUseError);
    }
    loggin.error("CLIENT", this.message, this.stack, this.object);
  }
}

class DeleteImageError extends Error {
  constructor(message, object = {}) {
    super(message);
    this.name = "DeleteImageError";
    this.object = object;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, DeleteImageError);
    }
    loggin.error("IMAGE", this.message, this.stack, this.object);
  }
}

class UploadImageError extends Error {
  constructor(message, object = {}) {
    super(message);
    this.name = "UploadImageError";
    this.object = object;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, UploadImageError);
    }
    loggin.error("IMAGE", this.message, this.stack, this.object);
  }
}

class ParamInvalidError extends Error {
  constructor(message, object = {}) {
    super(message);
    this.name = "ParamInvalidError";
    this.object = object;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ParamInvalidError);
    }
    loggin.error("CLIENT", this.message, this.stack, this.object);
  }
}

module.exports = {
  ServerError,
  DatabaseError,
  UserNotFoundError,
  AlreadyInUseError,
  ItemNotFoundError,
  DeleteImageError,
  ParamInvalidError,
  UploadImageError,
};
