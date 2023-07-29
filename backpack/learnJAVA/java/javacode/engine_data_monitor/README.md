# engine_data_monitor

DDL:
CREATE TABLE public.common_data_monitor_setting (
execution_group varchar(10) NOT NULL,
execution_session numeric(10) NOT NULL,
checking_data_source varchar(255) NOT NULL,
checking_table varchar(255) NOT NULL,
checking_dimension jsonb NOT NULL,
checking_processed_time varchar(255) NOT NULL,
checking_processed_time_format varchar(255) NOT NULL,
tolerance_time_sec numeric(10) NOT NULL,
mail_to varchar(255) NOT NULL,
mail_template varchar(255) NOT NULL,
CONSTRAINT common_data_monitor_setting_pk PRIMARY KEY (execution_group, execution_session)
);