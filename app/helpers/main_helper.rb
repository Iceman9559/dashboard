module MainHelper
	def navigation
		navigation = [
				{ :url => 'main#home', :text => 'Home', :dropdown => [] },
				{ :url => 'main#contracts', :text => 'Contracts', :dropdown => [] },
				{ :url => 'main#invoices', :text => 'Invoices', :dropdown => [] },
				{ :url => 'main#reports', :text => 'Reports', :dropdown => [] },
				{ :url => 'main#labor', :text => 'Labor Category', :dropdown => [] },
				{ :url => 'main#cost', :text => 'Cost Category', :dropdown => [] },
				{ :url => 'main#subcontractors', :text => 'Subcontractors', :dropdown => [] },
				{ :url => 'main#employees', :text => 'Employees', :dropdown => [] },
				{ :url => 'main#resumes', :text => 'Resumes', :dropdown => [] }
			]

		if admin_signed_in?
			navigation[1].dropdown << { :url => 'admin#contracts', :text => 'Edit Contracts' }
			navigation[2].dropdown << { :url => 'admin#invoices', :text => 'Edit Invoices' }

			navigation[3].dropdown = [
				{ :url => 'admin#Reports', :text => '' },
				{ :url => 'admin#Reports', :text => '' },
				{ :url => 'admin#Reports', :text => '' },

				{ :url => 'admin#Reports', :text => '' },
				{ :url => 'admin#Reports', :text => '' },

				{ :url => 'admin#Reports', :text => '' },
				{ :url => 'admin#Reports', :text => '' },
				{ :url => 'admin#Reports', :text => '' }
			]
		end
	end
end
