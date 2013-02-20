class ApplicationController < ActionController::Base
	protect_from_forgery

=begin
	protected
		def authorize
			unless User.find_by_id(session[:user_id])
				flash.now[:success] = "Welcome to Dashboard! Please Sign In."
				render "main/login"
			end
		end
=end
end