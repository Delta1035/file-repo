package com.wistron.common.mapper;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.wistron.common.entity.User;
import org.assertj.core.api.Assert;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;
import java.util.Random;


@SpringBootTest
public class SampleTest {

    @Autowired
    private UserMapper userMapper;
    @Test
    void testSave(){
        User user = new User();
        user.setName("测试专用名");
        user.setAge(20);
        user.setTel("18062313329");
        user.setPassword("1212121");
        userMapper.insert(user);
    }
    @Test
    void testDelete(){
        userMapper.deleteById(6);
    }

    @Test
    void testSelectById(){
        User user = userMapper.selectById(2);
        System.out.println(user);
    }

    @Test
    void testUpdate(){
        User user = new User();
        user.setId(3);
        user.setName("这是被我更新过的名字");
        userMapper.updateById(user);
    }

    @Test
    void testGetPage(){
        IPage page = new Page(1,10);
        userMapper.selectPage(page,null);
        System.out.println("当前页码值"+page.getCurrent());
        System.out.println("每页显示数量"+page.getSize());
        System.out.println("一共多少页"+page.getPages());
        System.out.println("一共多少条数据"+page.getTotal());
        System.out.println("数据"+page.getRecords());
    }
    @Test
    public void testSelect(){
        System.out.println("----- selectAll method test ------");
        List<User> userList = userMapper.selectList(null);
        System.out.println(userList);
//        Assert.assertEquals(5, userList.size());
//        userList.forEach(System.out::println);
    }
}
