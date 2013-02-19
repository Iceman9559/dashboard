class User < ActiveRecord::Base
  attr_accessible :datetime, :datetime, :email, :firstName, :lastName, :password, :updated_date
end
