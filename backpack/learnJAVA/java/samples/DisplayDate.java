package com.wistron.avatar.basic.samples;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class DisplayDate {
	public static void main(String args[]) {
		// Instantiate an object
		Date date = new Date();

		// display current timestamp
		System.out.println(date.getTime());

		// display time and date
		System.out.println(date.toString());

		// Date formatting
		SimpleDateFormat dateFormat = new SimpleDateFormat("E yyyy.MM.dd 'at' hh:mm:ss a zzz");
		System.out.println("Current Date: " + dateFormat.format(date));

		// Calendar initialize
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);

		cal.add(Calendar.MONTH, 1); // add 1 month
		cal.add(Calendar.HOUR, 3); // add 3 hours
		cal.add(Calendar.YEAR, -2); // minus 2 years
		cal.add(Calendar.DAY_OF_WEEK, 3); // add 3 days
	}
}