require 'test_helper'

class SoundAndKitsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @sound_and_kit = sound_and_kits(:one)
  end

  test "should get index" do
    get sound_and_kits_url
    assert_response :success
  end

  test "should get new" do
    get new_sound_and_kit_url
    assert_response :success
  end

  test "should create sound_and_kit" do
    assert_difference('SoundAndKit.count') do
      post sound_and_kits_url, params: { sound_and_kit: { kit_id: @sound_and_kit.kit_id, sound_id: @sound_and_kit.sound_id } }
    end

    assert_redirected_to sound_and_kit_url(SoundAndKit.last)
  end

  test "should show sound_and_kit" do
    get sound_and_kit_url(@sound_and_kit)
    assert_response :success
  end

  test "should get edit" do
    get edit_sound_and_kit_url(@sound_and_kit)
    assert_response :success
  end

  test "should update sound_and_kit" do
    patch sound_and_kit_url(@sound_and_kit), params: { sound_and_kit: { kit_id: @sound_and_kit.kit_id, sound_id: @sound_and_kit.sound_id } }
    assert_redirected_to sound_and_kit_url(@sound_and_kit)
  end

  test "should destroy sound_and_kit" do
    assert_difference('SoundAndKit.count', -1) do
      delete sound_and_kit_url(@sound_and_kit)
    end

    assert_redirected_to sound_and_kits_url
  end
end
