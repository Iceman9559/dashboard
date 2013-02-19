# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
# encoding: utf-8

User.create([
  { :firstName => nil, :lastName => nil, :password => nil, :email => nil, :admin => nil, :created_at => nil, :updated_at => nil }
], :without_protection => true )


# encoding: utf-8

User.create([
  { :firstName => nil, :lastName => "Yungchih Chen", :password => "password", :email => "yungchih.chen@dmsva.com", :admin => true, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "James Anderson", :password => "test1234", :email => "james.anderson@dmsva.com", :admin => true, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "John Test", :password => "welcome", :email => "John@aol.com", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "Eric Che", :password => "741852", :email => "eric@aol.com", :admin => true, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "Ted Lee", :password => "123456", :email => "tlee@aol.com", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "Todd Chen", :password => "password123", :email => "ychen@aol.com", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "testuser3", :password => "147852", :email => "testuser4@aol.com", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "asdfasdfasdf", :password => "asdfasdf", :email => "asdfasdfasdf@asdf.asdf", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "zxcvzxcvzxcv", :password => "zxcvzxcvzxcv", :email => "zxcv@zxv.zxcv", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "testuser5", :password => "748596", :email => "testuser@aol.com", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "testing", :password => "741852", :email => "testuser4@aol.com", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "zxcvzxcvzxcv", :password => "zxcvzxcv", :email => "zxcv@zxv.zxcv", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "zxcvzxcvzxcv", :password => "zxcvzxcv", :email => "zxcv@zxv.zxcv", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "asdfasdf", :password => "asdfasdf", :email => "asdf@asdf.asdf", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "zxcvzxcvzxcv", :password => "zxcvzxcv", :email => "zxcv@zxv.zxcv", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "new_lastName", :password => "pwpwpwpw", :email => "new_email@test.com", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "qwerasdf", :password => "1234567", :email => "dddd@aol.com", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "John Gaughan", :password => "shamrokDB01", :email => "john.gaughan@dmsva.com", :admin => true, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "Denise Heckrotte", :password => "password", :email => "denise.heckrotte@dmsva.com", :admin => true, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "Mario Gonzales", :password => "password", :email => "mario.gonzales@dmsva.com", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "Kevin Chiu", :password => "lego8140", :email => "Kevin.Chiu@dmsva.com", :admin => true, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "Michele Campbell", :password => "welcome", :email => "michele.campbell@dmsva.com", :admin => true, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "testuser", :password => "welcome", :email => "test@aol.com", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "Jed Ta", :password => "test123", :email => "jed.tan@dmsva.com", :admin => true, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "Paul Weinacht", :password => "dms4280", :email => "paul.weinacht.civ@mail.mil", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" },
  { :firstName => nil, :lastName => "Tim Vong", :password => "password123", :email => "timothy.t.vong.civ@mail.mil", :admin => false, :created_at => "2013-02-19 00:00:00", :updated_at => "2013-02-19 00:00:00" }
], :without_protection => true )