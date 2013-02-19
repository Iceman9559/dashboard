module ApplicationHelper
	def title(page_title)
		content_for :title, page_title.to_s
	end

	def flashes_helper
		results = []
		falshes = [:notice, :error, :alert, :success, :info]
		falshes.each do |name, msg|
			hidden = "hide" if flash[name].blank?
			alert_inner = content_tag(:span, raw("&times;"), class: "close") + content_tag(:p, flash[name])
			results << content_tag(:div, alert_inner, class: "alert alert-block alert-#{name} #{hidden}").html_safe
		end
		results.join("").html_safe
	end
end