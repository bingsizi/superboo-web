package com.superboo.core.util;

import java.util.UUID;

/**
 * RandomUtil
 *
 * @author peiran zhang
 * @date 2016/6/23
 */
public class RandomUtil {
    /**
     * 取出一个指定长度大小的随机正整数.
     *
     * @param length
     *            int 设定所取出随机数的长度。length小于11
     * @return int 返回生成的随机数。
     */
    public static int buildRandom(int length) {
        int num = 1;
        double random = Math.random();
        if (random < 0.1) {
            random = random + 0.1;
        }
        for (int i = 0; i < length; i++) {
            num = num * 10;
        }
        return (int) ((random * num));
    }

    /**
     * 获得uuid
     * @return
     */
    public static String getUUID(){
        return UUID.randomUUID().toString().replaceAll("-", "");
    }
    
    /**
     * 随机生成订单号
     * @param customerId 客户id
     * @return
     * @author zhangpeiran 2016年6月23日 下午3:28:05
     */
    public static String createOrderNo(Long customerId){
    	return DateUtils.dateStringFormatF(DateUtils.getSystemTime())+buildRandom(3)+customerId;
    }
}
