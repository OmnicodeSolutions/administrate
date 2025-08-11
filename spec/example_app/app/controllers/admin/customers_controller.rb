module Admin
  class CustomersController < Admin::ApplicationController
    def become
      user_id = params[:id]
      if user_id == "admin"
        session.delete(:user_id)
      else
        session[:user_id] = user_id
      end
      redirect_back fallback_location: admin_root_url
    end

    def destroy
      requested_resource = scoped_resource.find(params[:id])
      
      begin
        requested_resource.destroy!
        flash[:notice] = translate_with_resource("destroy.success")
      rescue => e
        flash[:error] = "Failed to delete customer: #{e.message}"
      end
      
      redirect_to action: :index
    end

    private

    def scoped_resource
      Customer.where(hidden: false)
    end
  end
end
