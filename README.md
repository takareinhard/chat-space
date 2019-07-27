# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|user_name|string|null: false add_index: true|
|email|string|null: false, unique: true|
|password|string|null: false|

### Association
- has_many :messages
- belongs_to :group

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false add_index: true|
|image|string|null: false|
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- has_many :groups, through: :members

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|group_name|string|null: false, add_index: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- has_many :users
- has_many :messages, through: :members

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
