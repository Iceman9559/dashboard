# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# encoding: utf-8
User.create([
  { :firstName => "Yungchih", :lastName => "Chen", :password => "password", :email => "yungchih.chen@dmsva.com", :admin => true, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => "James", :lastName => "Anderson", :password => "test1234", :email => "james.anderson@dmsva.com", :admin => true, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => "John", :lastName => "Test", :password => "welcome", :email => "John@aol.com", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => "Eric", :lastName => "Chen", :password => "741852", :email => "eric@aol.com", :admin => true, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => "Ted", :lastName => "Lee", :password => "123456", :email => "tlee@aol.com", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => "Todd", :lastName => "Chen", :password => "password123", :email => "ychen@aol.com", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => "John", :lastName => "Gaughan", :password => "shamrokDB01", :email => "john.gaughan@dmsva.com", :admin => true, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => "Denise", :lastName => "Heckrotte", :password => "password", :email => "denise.heckrotte@dmsva.com", :admin => true, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => "Mario", :lastName => "Gonzales", :password => "password", :email => "mario.gonzales@dmsva.com", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => "Kevin", :lastName => "Chiu", :password => "lego8140", :email => "Kevin.Chiu@dmsva.com", :admin => true, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => "Michele", :lastName => "Campbell", :password => "welcome", :email => "michele.campbell@dmsva.com", :admin => true, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => "testuser", :lastName => "", :password => "welcome", :email => "test@aol.com", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => "Jed", :lastName => "Ta", :password => "test123", :email => "jed.tan@dmsva.com", :admin => true, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => "Paul", :lastName => "Weinacht", :password => "dms4280", :email => "paul.weinacht.civ@mail.mil", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => "Tim", :lastName => "Vong", :password => "password123", :email => "timothy.t.vong.civ@mail.mil", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" }
], :without_protection => true )