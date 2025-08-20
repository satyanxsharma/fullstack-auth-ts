import mongoose from 'mongoose';

class Database {
  private static instance: Database;
  private connectionString: string;

  private constructor() {
    this.connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/fullstack-auth';
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public async connect(): Promise<void> {
    try {
      // Configure Mongoose options
      const options = {
        // Automatically build indexes
        autoIndex: true,
        // Server selection timeout
        serverSelectionTimeoutMS: 5000,
        // Socket timeout
        socketTimeoutMS: 45000,
        // Buffer commands when disconnected
        bufferCommands: false,
        // Maximum number of concurrent connections
        maxPoolSize: 10,
        // Close connections after 30 seconds of inactivity
        maxIdleTimeMS: 30000,
      };

      // Connect to MongoDB
      await mongoose.connect(this.connectionString, options);
      
      console.log('✅ Connected to MongoDB successfully');

      // Handle connection events
      this.setupEventHandlers();
      
    } catch (error) {
      console.error('❌ MongoDB connection error:', error);
      
      // Exit process with failure
      process.exit(1);
    }
  }

  public async disconnect(): Promise<void> {
    try {
      await mongoose.disconnect();
      console.log('✅ Disconnected from MongoDB');
    } catch (error) {
      console.error('❌ Error disconnecting from MongoDB:', error);
    }
  }

  private setupEventHandlers(): void {
    // Connection successful
    mongoose.connection.on('connected', () => {
      console.log('🔗 Mongoose connected to MongoDB');
    });

    // Connection error
    mongoose.connection.on('error', (err) => {
      console.error('❌ Mongoose connection error:', err);
    });

    // Connection disconnected
    mongoose.connection.on('disconnected', () => {
      console.log('⚠️  Mongoose disconnected from MongoDB');
    });

    // Application termination
    process.on('SIGINT', async () => {
      await this.disconnect();
      process.exit(0);
    });
  }

  public getConnection() {
    return mongoose.connection;
  }

  public isConnected(): boolean {
    return mongoose.connection.readyState === 1;
  }
}

// Export singleton instance
export default Database.getInstance();