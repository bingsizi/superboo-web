package com.superboo.core.json;

import java.io.IOException;
import java.util.Date;
import org.apache.commons.lang3.StringUtils;
import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.superboo.core.util.DateUtils;
/**
 * json反序列化,将yyyy-MM-dd格式转换为date
 *
 */
public class JsonDateDeserializer extends JsonDeserializer<Date>{

	@Override
	public Date deserialize(JsonParser parser, DeserializationContext context) throws IOException, JsonProcessingException {
        String dateStr = parser.getText();
        if(!StringUtils.isNotBlank(dateStr))
		  return null;
        else{
        	return DateUtils.stringDateFormat(dateStr,"yyyy-MM-dd");
        }
	}

}


