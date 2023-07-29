package com.wistron.avatar.common.util.mailserviceutil;

import com.wistron.avatar.ApplicationContextProvider;
import com.wistron.avatar.common.util.ConstUtil;
import com.wistron.avatar.common.vo.ProfileActiveVo;
import com.wistron.avatar.common.vo.SpringMailInVo;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * Type: <br>
 * Version: 1.0<br>
 * Author:  Ken KL Cheng, 10407101<br>
 * Modify:
 * 1.0 Create<br>
 * Description: 整合Spring寄EMAIL的工具，本機無法寄送
 */
@Slf4j
@Configuration
public class SpringMailUtil {

    private static JavaMailSender javaMailSender;

    /**
     * for system use
     */
    public static void setMailSender(JavaMailSender javaMailSender) {
        SpringMailUtil.javaMailSender = javaMailSender;
    }

    /**
     * for system use
     */
    public static void cleanMailSender() {
        SpringMailUtil.javaMailSender = null;
    }

    /**
     * send mime mail without attachment
     */
    public void sendMIME(String[] to, String[] cc, String subject, String body) throws MessagingException {
        this.sendMIME(to, cc, subject, body, new File[0]);
    }

    public void sendMIME(String[] to, String[] cc, String subject, String body, File... files) throws MessagingException {
        String prefix = this.getPrefix();

        MimeMessage message = this.formaMessage(to, cc, prefix + subject, body, files);

        javaMailSender.send(message);
    }

    /**
     * send multiple mime mail
     */
    public void sendMIME(List<SpringMailInVo> inList) throws MessagingException {
        String prefix = this.getPrefix();

        List<MimeMessage> msg = new ArrayList<>();

        for (SpringMailInVo in : inList) {
            msg.add(this.formaMessage(in.getTo(), in.getCc(), prefix + in.getSubject(), in.getBody(), in.getFiles()));
        }

        javaMailSender.send(msg.toArray(new MimeMessage[msg.size()]));
    }

    /**
     * send simple message mail
     */
    public void sendText(String[] to, String[] cc, String subject, String body) {
        SimpleMailMessage msg = new SimpleMailMessage();

        // multipart message
        String prefix = this.getPrefix();

        msg.setSubject(prefix + subject);
        msg.setTo(to);
        if (cc != null) {
            msg.setCc(cc);
        }
        msg.setText(body); // true indicates html
        // continue using helper object for more functionalities like adding attachments, etc.

        javaMailSender.send(msg);
    }

    /**
     * send multiple simple message mail
     */
    public void sendText(List<SpringMailInVo> inList) {
        // multipart message
        String prefix = this.getPrefix();

        List<SimpleMailMessage> msgs = new ArrayList<>();

        for (SpringMailInVo in : inList) {

            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setSubject(prefix + in.getSubject());
            msg.setTo(in.getTo());
            if (in.getCc() != null) {
                msg.setCc(in.getCc());
            }
            msg.setText(in.getBody()); // true indicates html
            msgs.add(msg);
        }

        javaMailSender.send(msgs.toArray(new SimpleMailMessage[msgs.size()]));
    }

    /**
     * Convert array to string by ;
     */
    public String convertArrayToString(String[] arr) {
        String result = "";

        if (arr != null && arr.length > 0) {
            for (String str : arr) {
                if ("".equals(result)) {
                    result = str;
                } else {
                    result = String.format("%s;%s", result, str);
                }
            }
        }

        return result;
    }

    private String getPrefix() {
        ProfileActiveVo avtConfig = ApplicationContextProvider.getBean(ProfileActiveVo.class);
        return String.format("[%s] ", avtConfig.getActive().toUpperCase());
    }

    private MimeMessage formaMessage(String[] to, String[] cc, String subject, String body, File[] files) throws MessagingException {


        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper;

        helper = new MimeMessageHelper(message, true); // true indicates
        // multipart message
        helper.setSubject(subject);
        helper.setTo(to);
        if (cc != null) {
            helper.setCc(cc);
        }
        helper.setText(body, true); // true indicates html

        if (StringUtils.isNoneBlank(ConstUtil.MAIL_FROM)) {
            helper.setFrom(ConstUtil.MAIL_FROM);
        }
        // continue using helper object for more functionalities like adding attachments, etc.


        if (files != null) {
            for (File file : files) {
                FileSystemResource fsr = new FileSystemResource(file);
                helper.addAttachment(file.getName(), fsr);
            }
        }
        return message;
    }
}
