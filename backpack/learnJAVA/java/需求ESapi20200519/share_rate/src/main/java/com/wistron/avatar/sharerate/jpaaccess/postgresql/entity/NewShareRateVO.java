package com.wistron.avatar.sharerate.jpaaccess.postgresql.entity;

import javax.persistence.Entity;
import javax.persistence.IdClass;
import javax.persistence.Table;

@Entity
@IdClass(NewShareRateVOPK.class)
@Table(name = "whq_avatar_sim_ww_share_rate_result", schema = "public")
public class NewShareRateVO extends ShareRateBaseVO{

}
