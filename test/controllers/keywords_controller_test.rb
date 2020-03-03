require 'test_helper'

class KeywordsControllerTest < ActionDispatch::IntegrationTest
  test "should get new" do
    get keywords_new_url
    assert_response :success
  end

  test "should get index" do
    get keywords_index_url
    assert_response :success
  end

end
