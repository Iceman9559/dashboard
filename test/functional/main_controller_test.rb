require 'test_helper'

class MainControllerTest < ActionController::TestCase
  test "should get home" do
    get :home
    assert_response :success
  end

  test "should get login" do
    get :login
    assert_response :success
  end

  test "should get contracts" do
    get :contracts
    assert_response :success
  end

  test "should get invoices" do
    get :invoices
    assert_response :success
  end

  test "should get reports" do
    get :reports
    assert_response :success
  end

  test "should get settings" do
    get :settings
    assert_response :success
  end

end
