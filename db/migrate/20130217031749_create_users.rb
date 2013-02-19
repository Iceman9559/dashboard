class CreateUsers < ActiveRecord::Migration
	def change
		create_table :users do |t|
			t.string 	:firstName, :null => true
			t.string 	:lastName, 	:null => true
			t.string 	:password,	:null => true
			t.string 	:email,			:null => true
			t.boolean :admin, 		:null => false

			t.timestamps
		end
	end
end