INSERT INTO `User` 
(`user_id`, `first_name`, `last_name`, `middle_name`, `email`, `phone`, `dob`, `gender`, `address`, `locality`, `pincode`, `city`, `state`, `community_ids`, `community_heads_ids`, `community_creator_ids`, `active_season_ids`, `join_date`, `last_active_datetime`, `height`, `weight`, `profile_picture`, `notification_settings`) 
VALUES 
('abcxyz', 'Mayur', 'Agarwal', 'Manoj', 'mayur.agarwal22@vit.edu', '9921318237', '2004-07-05', 'Male', '3, Pancharatna, Burhani Colony', 'Market Yard', '411037', 'Pune', 'Maharashtra', NULL, NULL, NULL, NULL, '2023-08-18 05:22:26.000000', NULL, NULL, NULL, NULL, NULL)

INSERT INTO `User` 
(`user_id`, `first_name`, `last_name`, `middle_name`, `email`, `phone`, `dob`, `gender`, `address`, `locality`, `pincode`, `city`, `state`, `community_ids`, `community_heads_ids`, `community_creator_ids`, `active_season_ids`, `join_date`, `last_active_datetime`, `height`, `weight`, `profile_picture`, `notification_settings`) 
VALUES 
('defxyz','Nujaim', 'Maindargi', 'Qadeer', 'nujaim.maindargi22@vit.edu', '7249529493', '2005-03-31', 'Male', '3, bibwewadi, sate bank nagar Colony', 'Indira Nagar', '411037', 'Pune', 'Maharashtra', NULL, NULL, NULL, NULL, '2023-08-18 05:23:26.000000', NULL, NULL, NULL, NULL, NULL)

INSERT INTO `User` 
(`user_id`, `first_name`, `last_name`, `middle_name`, `email`, `phone`, `dob`, `gender`, `address`, `locality`, `pincode`, `city`, `state`, `community_ids`, `community_heads_ids`, `community_creator_ids`, `active_season_ids`, `join_date`, `last_active_datetime`, `height`, `weight`, `profile_picture`, `notification_settings`) 
VALUES 
('ghixyz', 'manesh', 'mahale', 'dilip', 'manesh.mahale22@vit.edu', '8767619678', '2003-05-10', 'Male', '5, bibwewadi, sate bank nagar Colony', 'Indira Nagar', '411037', 'Pune', 'Maharashtra', NULL, NULL, NULL, NULL, '2023-08-18 05:24:26.000000', NULL, NULL, NULL, NULL, NULL)




INSERT INTO `Community` 
(`community_id`, `community_join_code`, `community_name`, `locality`, `pincode`, `city`, `state`, `created_by_user_id`, `community_heads_user_id`, `created_datetime`, `members_count`, `description`, `parent`, `children`, `access`, `last_updated_datetime`) 
VALUES 
('o1234567890', 'abcdef', 'Rotary Club', 'Lokmanyanagar', '411045', 'Pune', 'Maharashtra', 'abcxyz', '["abcxyz"]', '2023-08-18 06:01:29.000000', '1', 'Community of Rotary Club Pune Lokmanyanagar', NULL, NULL, 'Open', NULL)


INSERT INTO `CommunityUserMapping` (`community_user_mapping_id`, `community_id`, `user_id`, `role`, `join_date`, `last_active_datetime`) VALUES (NULL, 'o1234567890', 'abcxyz', 'Admin', '2023-08-18 07:59:41.000000', NULL);
INSERT INTO `CommunityUserMapping` (`community_user_mapping_id`, `community_id`, `user_id`, `role`, `join_date`, `last_active_datetime`) VALUES (NULL, 'o1234567890', 'defxyz', 'Member', '2023-08-18 08:00:17.000000', NULL);
INSERT INTO `CommunityUserMapping` (`community_user_mapping_id`, `community_id`, `user_id`, `role`, `join_date`, `last_active_datetime`) VALUES (NULL, 'o1234567890', 'ghixyz', 'Member', '2023-08-18 08:00:47.000000', NULL);



INSERT INTO `Seasons` 
(`season_id`, `name`, `start_date`, `end_date`, `num_challenges`, `active`, `created_by_user_id`, `created_datetime`, `last_updated_datetime`, `description`, `min_to_comply`) 
VALUES 
('s123456789034', 'Season 1', '2023-07-05', '2023-11-16', NULL, '0', '["abcxyz"]', '2023-08-18 06:10:30.000000', NULL, 'This is the 1st season', NULL)



INSERT INTO `CommunitySeasonMapping` 
(`community_season_mapping_id`, `community_id`, `season_id`, `join_date`) 
VALUES 
(NULL, 'o1234567890', 's123456789034', '2023-08-18 06:23:31.000000');



