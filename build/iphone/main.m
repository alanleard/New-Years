//
//  Appcelerator Titanium Mobile
//  WARNING: this is a generated file and should not be modified
//

#import <UIKit/UIKit.h>
#define _QUOTEME(x) #x
#define STRING(x) _QUOTEME(x)

NSString * const TI_APPLICATION_DEPLOYTYPE = @"test";
NSString * const TI_APPLICATION_ID = @"com.newyears.app";
NSString * const TI_APPLICATION_PUBLISHER = @"alanleard";
NSString * const TI_APPLICATION_URL = @"http://winewebdesign.com";
NSString * const TI_APPLICATION_NAME = @"New Years";
NSString * const TI_APPLICATION_VERSION = @"3.0";
NSString * const TI_APPLICATION_DESCRIPTION = @"2013 New Years App";
NSString * const TI_APPLICATION_COPYRIGHT = @"2012 by alanleard";
NSString * const TI_APPLICATION_GUID = @"bd254f0f-5c16-470f-a857-9806d2c8ec71";
BOOL const TI_APPLICATION_ANALYTICS = false;

#ifdef TARGET_IPHONE_SIMULATOR
NSString * const TI_APPLICATION_RESOURCE_DIR = @"";
#endif

int main(int argc, char *argv[]) {
    NSAutoreleasePool * pool = [[NSAutoreleasePool alloc] init];

#ifdef __LOG__ID__
	NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES);
	NSString *documentsDirectory = [paths objectAtIndex:0];
	NSString *logPath = [documentsDirectory stringByAppendingPathComponent:[NSString stringWithFormat:@"%s.log",STRING(__LOG__ID__)]];
	freopen([logPath cStringUsingEncoding:NSUTF8StringEncoding],"w+",stderr);
	fprintf(stderr,"[INFO] Application started\n");
#endif

	int retVal = UIApplicationMain(argc, argv, nil, @"TiApp");
    [pool release];
    return retVal;
}
