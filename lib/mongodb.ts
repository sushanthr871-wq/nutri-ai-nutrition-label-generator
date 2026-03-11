import mongoose from "mongoose"

// delay checking the environment variable until an actual connection
// attempt is made. throwing at import time caused the dev server to crash
// with an HTML error page when MONGODB_URI wasn't set, which in turn
// resulted in JSON parsing errors on the client-side.
let MONGODB_URI = process.env.MONGODB_URI

interface MongooseCache {
  conn: typeof mongoose | null
  promise: Promise<typeof mongoose> | null
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null }

if (!global.mongoose) {
  global.mongoose = cached
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn
  }

  if (!MONGODB_URI) {
    // only throw when the function is actually used, so that routes can
    // catch the error and return a proper JSON response instead of crashing
    // the entire server at module eval time.
    throw new Error("Please define the MONGODB_URI environment variable")
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((m) => m)
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}
