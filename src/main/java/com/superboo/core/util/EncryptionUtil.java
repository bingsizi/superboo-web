package com.superboo.core.util;


/**
 * 加密工具类
 * 
 * @author zhangpeiran
 * @version
 * @date 2016年5月31日 上午9:28:42
 */
public class EncryptionUtil {
	/**
	 * md5加密
	 * 
	 * @param source
	 * @return
	 * @author zhangpeiran 2016年5月31日 上午9:38:08
	 */
	public static String md5(String source) {
		return source;
		//return new Md5Hash(source).toString();
	}

	/**
	 * Returns a Base64-encoded string of the underlying byte array. This
	 * implementation caches the resulting Base64 string so multiple calls to
	 * this method remain efficient. However, calling setBytes will null the
	 * cached value, forcing it to be recalculated the next time this method is
	 * called.
	 * 
	 * Overrides: toBase64() in AbstractHash Returns: a Base64-encoded string of
	 * the underlying byte array.
	 * 
	 * @param source
	 * @return
	 * @author zhangpeiran 2016年5月31日 上午9:39:36
	 */
	public static String md5ToBase64(String source) {
		return source;
		//return new Md5Hash(source).toBase64();
	}
	/**
	 * md5ToBase64的base64解密
	 * @param md5base64
	 * @return
	 * @author zhangpeiran 2016年5月31日 上午9:41:55
	 */
	public static String md5FromBase64String(String md5base64){
		return md5base64;
		//return Md5Hash.fromBase64String(md5base64).toString();
	}
	
	public static void main(String[] args) {
		System.out.println(md5ToBase64("manager"));
	}

}
