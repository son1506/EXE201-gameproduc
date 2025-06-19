// src/app/utils/testFirebase.ts
import firebaseStorageService from '../../app/Services/firebaseStorage';
import { message } from 'antd';

interface TestResult {
  success: boolean;
  message: string;
  filesCount?: number;
  foldersCount?: number;
}

export async function testFirebaseConnection(): Promise<TestResult> {
  try {
    console.log('🧪 Testing Firebase Storage connection...');
    
    const result = await firebaseStorageService.testConnection();
    
    if (result.success) {
      return {
        success: true,
        message: 'Firebase Storage connected successfully!',
        filesCount: result.filesCount,
        foldersCount: result.foldersCount
      };
    } else {
      return {
        success: false,
        message: result.error || 'Firebase Storage connection failed'
      };
    }
  } catch (error) {
    console.error('❌ Firebase test error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return {
      success: false,
      message: `Firebase test failed: ${errorMessage}`
    };
  }
}

export async function runFirebaseTest(): Promise<TestResult> {
  message.loading({ content: 'Testing Firebase connection...', key: 'firebase-test' });
  
  try {
    const result = await testFirebaseConnection();
    
    if (result.success) {
      message.success({ 
        content: '✅ ' + result.message, 
        key: 'firebase-test',
        duration: 3
      });
      
      // Show detailed info
      setTimeout(() => {
        const filesCount = result.filesCount || 0;
        const foldersCount = result.foldersCount || 0;
        
        alert(`🔥 Firebase Storage Test Results:\n\n✅ Connection: Success\n📦 Project: badminton-b9e99\n🌐 Storage Bucket: badminton-b9e99.appspot.com\n📁 Files found: ${filesCount}\n📂 Folders found: ${foldersCount}\n\nYou can now upload images!`);
      }, 500);
    } else {
      message.error({ 
        content: '❌ ' + result.message, 
        key: 'firebase-test',
        duration: 5
      });
      
      // Show error details
      setTimeout(() => {
        alert(`❌ Firebase Storage Test Failed:\n\n${result.message}\n\nPlease check:\n1. Firebase config in .env file\n2. Storage rules in Firebase Console\n3. Internet connection\n4. Project permissions`);
      }, 500);
    }
    
    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    message.error({ 
      content: '❌ Test failed: ' + errorMessage, 
      key: 'firebase-test',
      duration: 5
    });
    
    return {
      success: false,
      message: errorMessage
    };
  }
}